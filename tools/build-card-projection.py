"""Build a public, read-only card projection from pinned source definitions.

Requires PyYAML 6.0.3. No provider calls, runtime observations or private receipts.
"""
import argparse
import datetime
import hashlib
import json
import re
import subprocess
from pathlib import Path
import yaml

SOURCE_COMMIT = "c4427795dbd64510fdef162dfcff616c33f27558"
SOURCE_BASE = f"https://github.com/TTaoGaming/hfo-gen-143/blob/{SOURCE_COMMIT}/"
CATALOG_PATH = "cards/gleipnir-grimoire/DECKLIST_v1.yaml"
CF_DOC = "https://developers.cloudflare.com/durable-objects/"
STYLE = ("Original HFO editorial science-fantasy. Obsidian, restrained crimson light, ivory highlights, "
         "etched technical geometry, tactile mineral and archival-paper textures. Vertical 4:5, one clear "
         "central silhouette, quiet crop margins. No text, numerals, logos, badges, evidence stamps, "
         "franchise characters or recognizable franchise art. Conceptual illustration only.")

PROFILES = {
 "CORE-01": ("A shared institution for useful human–AI work.", "Keep purpose, beneficiaries, boundaries and acceptance visible."),
 "CORE-02": ("A typed addressing and navigation structure for the HFO ontology.", "Use topology for routing; never infer truth or permission from a coordinate."),
 "CORE-03": ("A bounded role position that an actor may occupy.", "Distinguish seat assignment from actor identity and its carrier."),
 "CORE-04": ("A continuing logical identity with recoverable state and responsibilities.", "Preserve actor continuity across changing sessions and carriers."),
 "CORE-07": ("A source-bound record supporting a specific claim.", "Check source, scope, revision and observation time before relying on a receipt."),
 "CORE-10": ("A provider relationship with distinct capacity, accounting and interfaces.", "Keep provider capabilities separate from account readiness and permission."),
 "CORE-11": ("A versioned composition of capabilities for a role.", "Resolve compatibility, exact revisions, authority and budget before acting."),
 "CORE-12": ("A declared organization of roles, equipment and relationships.", "Treat declared organization separately from the observed active workforce."),
 "CORE-13": ("A compact, versioned entrance to a typed concept and its sources.", "Unfold the relevant contract instead of treating the card face as all instructions."),
 "CORE-14": ("A checker for declared structural invariants.", "Report what the check covers; structural validity does not prove runtime behavior."),
 "HFO-G143-C016": ("A worker abstraction awaiting an admitted task and compatible loadout.", "Bind one work identity, scope, lease, carrier and result contract before launch."),
 "HFO-G143-C017": ("A worker phenotype emphasizing continuity and bounded recovery.", "Resume from durable evidence while preserving the existing owner and budget."),
 "HFO-G143-C031": ("A worker phenotype for a bounded, task-fit attempt.", "Return an exact candidate and evidence without expanding the effect scope."),
 "HFO-G143-C003": ("A learning cycle connecting hindsight, insight, validation and evolution.", "Carry verified learning into the next cycle and preserve unresolved failures."),
 "HFO-G143-C005": ("An evaluator whose revision stays fixed during a comparison.", "Reject attempts to improve a score by changing the judge or success criterion."),
 "HFO-G143-C023": ("A Kimi-compatible tool harness with an explicit capability interface.", "Verify harness and route compatibility; equipment does not grant authority."),
 "HFO-G143-C028": ("A pre-action procedure attached through a canonical skill reference.", "Check current preconditions and name the exact unmet requirement."),
 "HFO-G143-C029": ("A reminder to obtain a distinct, evidence-bound review.", "Do not count repeated summaries of the same evidence as independent verification."),
 "HFO-G143-C049": ("The explicit authority boundary for protected effects.", "Bind approval to the actual effect and current scope; never infer it from a name."),
 "GG-D8-LAND-CHATGPT-B-ORACLE": ("A provider-account capacity surface with a particular carrier route.", "Check global reservations and unknown sends before allocating another slot."),
 "GG-D7-HARNESS-CLOUDFLARE-SIGRUN": ("A catalogued Cloudflare service-binding harness for Sigrun.", "Resolve the exact service contract and actor binding; this catalog entry alone does not prove them."),
}
GRAMMAR = {
 "LAND":"layered terrain and bounded reservoirs connected by measured channels",
 "UNIT":"a compact modular seed-engine with visible attachment points",
 "APEX":"a deliberate central skald presence with a constellation of linked fragments",
 "HARNESS":"a detachable instrument with an exposed adapter coupling",
 "MODEL":"a distinct crystalline reasoning lens beside a separate carrier vessel",
 "AURA":"a surrounding field whose boundary is clearly visible",
 "AGENT_SKILL":"an etched procedural instrument attached to a separate worker",
 "WORKFLOW":"a finite sequence of connected stations with an unresolved final gate",
 "STRUCTURE":"an architectural archive with visible ingress and egress",
 "TOOL":"a precise inspection instrument with a clear input and output",
 "POLICY":"a bounded gateway with a visibly separate authorization seal",
 "RESOURCE":"a measured reservoir with an explicit containing boundary",
 "CURSE":"a visible fracture in a mechanism beside a recorded trace",
}


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2)+"\n", encoding="utf-8", newline="\n")


def plain(value):
    if value is None:
        return ""
    return value if isinstance(value, str) else json.dumps(value, ensure_ascii=False)


def parsed_links(values):
    rows=[]
    for raw in values or []:
        match=re.match(r"^(.*?)\s+(->|<-)\s+\[([^\]]+)\]\s*(.*)$", str(raw))
        if match:
            relation, direction, target, label=match.groups()
            rows.append({"relation":relation.strip()+" "+direction,"target_id":target,"label":label or target})
        else:
            rows.append({"relation":"source relation","target_id":None,"label":str(raw)})
    return rows


def card_markdown(card):
    lines=[f"# {card['name']}",f"ID: {card['id']} · {card['type_line']}",
      f"Definition: {card['definition_status']} / {card['definition_depth']}. Runtime: {card['runtime']['status']}. Behavior: {card['behavior']['status']}.",
      "",card['summary'],"","## Hyperstition",card['hyperstition'] or "Not imported.",
      "","## Engineering"]
    lines += [f"- {key}: {value or 'Not imported'}" for key,value in card['engineering'].items()]
    lines += ["","## Checks"]+["- "+x for x in card['checks']]
    lines += ["","## Behavioral target",card['behavior']['target'],"",card['behavior']['assay'],
      "","## Myth",card['myth'] or "Not imported.","","## Sources and technology"]
    lines += [f"- [{x['label']}]({x['url']})" for x in card['sources']+card['technology_refs']]
    lines += ["","## Typed links"]+[f"- {x['relation']} {x['target_id'] or ''} {x['label']}" for x in card['links']]
    lines += ["","## Art prompt",card['art']['prompt'],"","This public projection grants no authority. No behavioral improvement or live binding is claimed."]
    return "\n".join(lines)+"\n"


def main():
    ap=argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--source',type=Path,required=True)
    ap.add_argument('--sigrun',type=Path,required=True)
    ap.add_argument('--views',type=Path,required=True)
    ap.add_argument('--out',type=Path,required=True)
    ap.add_argument('--generated-at',required=True)
    args=ap.parse_args()
    if not re.fullmatch(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|\+00:00)',args.generated_at):
        raise ValueError('generated-at must be an ISO 8601 UTC timestamp')
    datetime.datetime.fromisoformat(args.generated_at.replace('Z','+00:00'))
    actual_commit=subprocess.check_output(['git','-C',str(args.source),'rev-parse','HEAD'],text=True).strip()
    if actual_commit != SOURCE_COMMIT:
        raise ValueError('Source checkout does not match the pinned source commit')
    if subprocess.check_output(['git','-C',str(args.source),'status','--porcelain','--untracked-files=all','--','cards'],text=True).strip():
        raise ValueError('Source cards must be clean before projection')
    oracle=args.sigrun.read_bytes()
    oracle_blob=hashlib.sha1(b'blob '+str(len(oracle)).encode()+b'\0'+oracle).hexdigest()
    if oracle_blob != '1de10bd6fd771c665b3765f8be747f4cace5e024':
        raise ValueError('Sigrun source does not match its pinned Git blob')
    deck=json.loads((args.source/CATALOG_PATH).read_text(encoding='utf-8'))
    definitions={}
    for file in sorted((args.source/'cards').glob('deck*/*.yaml')):
        data=yaml.safe_load(file.read_text(encoding='utf-8'))
        definitions[data['id']]=(data,SOURCE_BASE+file.relative_to(args.source).as_posix())
    sigrun=yaml.safe_load(args.sigrun.read_text(encoding='utf-8'))
    definitions['CORE-08']=(sigrun,'https://github.com/TTaoGaming/hfo-gen-143/blob/2cc7acb589d94adf58f024abf8853ebfd1ebbe40/candidates/cards/SIGRUN-ORACLE-v0.6.0.yaml')
    cards=[]
    for row in deck['cards']:
        cid=row['id']; kind=row['kind']; name=row['name']
        full, source_url=definitions.get(cid,({},SOURCE_BASE+CATALOG_PATH))
        fallback=f"{name}: a {kind.lower().replace('_',' ')} in the {deck['decks'][row['deck']]} deck. Full source contract remains to be imported."
        summary,target=PROFILES.get(cid,(plain(full.get('hyperstition')) or fallback,"Resolve the exact contract, check applicable constraints, and return source-bound evidence."))
        if full and cid not in PROFILES: target="Apply this card's explicit checks before making its associated claim or action."
        eng=full.get('engineering') or {}
        tech=[]
        if 'CLOUDFLARE' in cid:
            tech=[{"label":"Cloudflare Durable Objects documentation","url":CF_DOC}]
            if 'HARNESS' in cid: tech.append({"label":"Cloudflare service bindings","url":"https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/"})
        card={"id":cid,"name":name,"deck":row['deck'],"kind":kind,
          "type_line":plain(full.get('type_line')) or kind.replace('_',' '),"summary":summary,
          "summary_origin":"SOURCE_SUMMARY" if full and cid not in PROFILES else "EDITORIAL_PROPOSAL",
          "hyperstition":plain(full.get('hyperstition')),"myth":plain(full.get('myth')),
          "engineering":{key:plain(eng.get(key)) for key in ['pattern','origin','exemplar','maturity']},
          "checks":[plain(x) for x in full.get('checks',[])],"links":parsed_links(full.get('links')),
          "sources":[{"label":"Pinned card definition" if full else "Pinned catalog entry (definition incomplete)","url":source_url}],
          "technology_refs":tech,"definition_status":row['card_status'],"definition_depth":"full" if full else "index",
          "behavior":{"status":"NOT_TESTED","target":target,"assay":"Compare a source-bound card capsule against matched factual instructions on held-out tasks. Freeze carrier, tools, budget and evaluator; record constraint violations, useful outcomes and operator corrections. See /cards/behavior-assay.json."},
          "runtime":{"status":"UNVERIFIED","note":"Source engineering maturity is a historical author assertion, not fresh runtime evidence."},
          "art":{"status":"PROMPT_READY","prompt":f"{STYLE} Subject: {name}. Show {GRAMMAR.get(kind,'an organized archive object with a visible relationship to another distinct object')}. Express the intended role without depicting deployment, victory or authority.","alt":f"Planned conceptual illustration for {name}; no artwork generated."}}
        cards.append(card)
    cards.append({"id":"WW-EQ-CLOUDFLARE-DURABILITY-001","name":"Cloudflare Durability","deck":"D7","kind":"HARNESS","type_line":"EQUIPMENT — Durable Objects adapter (proposal)",
      "summary":"A concrete durability capability: bind actor state to a named Cloudflare Durable Object and recover it through an explicit storage contract.","summary_origin":"EDITORIAL_PROPOSAL",
      "hyperstition":"A carrier can end while a source-bound obligation remains recoverable.","myth":"The vessel rests; the inscription remains.",
      "engineering":{"pattern":"Cloudflare Durable Objects + durable storage + explicit adapter contract","origin":"Cloudflare platform documentation; HFO example source is separately pinned.","exemplar":"Worldweaver's PublicOasis class wraps OasisStore using Durable Object storage. This is an implementation example, not proof of Sigrun mission continuity.","maturity":"Documentation and implementation source linked; hosted recovery assay not performed for this card."},
      "checks":["Bind a specific actor ID, class and namespace; never treat the model session as the durable actor.","Declare the storage, schema, idempotency and recovery contract.","Test duplicate delivery and recovery against exact code/configuration before claiming the equipped system is durable.","Keep documented vendor capability, HFO implementation and observed hosted behavior separate."],
      "links":[{"relation":"equips through ->","target_id":"CORE-11","label":"Loadout"},{"relation":"supports ->","target_id":"CORE-04","label":"Actor"},{"relation":"records ->","target_id":"CORE-07","label":"Receipt"}],
      "sources":[{"label":"HFO Durable Object class — exact source","url":"https://github.com/TTaoGaming/hfo-swarm-factory/blob/42f8df9a5cc316670131310246ab4c4e51dc76fc/cloudflare/worldweaver-frontdoor/src/entry.js"},{"label":"HFO storage adapter — exact source","url":"https://github.com/TTaoGaming/hfo-swarm-factory/blob/42f8df9a5cc316670131310246ab4c4e51dc76fc/cloudflare/worldweaver-frontdoor/src/oasis-store.js"}],
      "technology_refs":[{"label":"Cloudflare Durable Objects — official documentation","url":CF_DOC},{"label":"Cloudflare rules of Durable Objects","url":"https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/"}],
      "definition_status":"PROPOSED_PUBLIC_EXTENSION","definition_depth":"full",
      "behavior":{"status":"NOT_TESTED","target":"Choose actual Durable Object/storage interfaces when durability is required, and demand recovery evidence before claiming end-to-end continuity.","assay":"Given an ephemeral chat and a task needing resumable state, identify the missing durable binding; propose a bounded duplicate/restart test; refuse to equate a storage API link with tested mission recovery."},
      "runtime":{"status":"UNVERIFIED","note":"No hosted recovery receipt was imported for this equipment card."},
      "art":{"status":"PROMPT_READY","prompt":STYLE+" Subject: a detachable obsidian archive module with layered chambers and an exposed adapter attached to a separate worker silhouette. Depict recoverable inscription, not immortality or infinite capacity. No vendor logo.","alt":"Planned detachable archive module attached to a separate worker; artwork pending."}})
    ids={c['id'] for c in cards}
    if len(ids)!=len(cards): raise ValueError('Duplicate card ID')
    for card in cards:
        for link in card['links']: link['resolved']=link['target_id'] in ids if link['target_id'] else False
    views=json.loads(args.views.read_text(encoding='utf-8'))['views']
    hand=['CORE-01','CORE-08','HFO-G143-C016','GG-D8-LAND-CHATGPT-B-ORACLE','WW-EQ-CLOUDFLARE-DURABILITY-001','GG-D1-WORKITEM','HFO-G143-C005','HFO-G143-C003']
    catalog={"schema":"worldweaver.public-card-projection.v1","version":"0.3.0","generated_at":args.generated_at,
      "source":{"url":SOURCE_BASE+CATALOG_PATH,"commit":SOURCE_COMMIT},
      "coverage":{"indexed":len(cards),"inherited_index":129,"full":sum(c['definition_depth']=='full' for c in cards),"history_complete":False,"note":"Complete pinned index plus one public equipment proposal. Index-only cards retain missing-definition labels. No whole-history completeness claim."},
      "decks":deck['decks'],"core_views":views,"default_hand":hand,"battlefield":[],"cards":cards}
    allowed={'index.html','cards.css','cards.js','catalog.json','index.json','hand.json','battlefield.json','image-prompts.json','art-guide.md','behavior-assay.json','README.md','source-lock.json','integrity.json'}
    allowed.update(f"definitions/{c['id']}.{ext}" for c in cards for ext in ('json','md'))
    unexpected=[p.relative_to(args.out).as_posix() for p in args.out.rglob('*') if p.is_file() and p.relative_to(args.out).as_posix() not in allowed]
    if unexpected:
        raise ValueError('Unexpected files in publication output; review separately: '+', '.join(unexpected))
    write_json(args.out/'catalog.json',catalog)
    write_json(args.out/'source-lock.json',{'schema':'worldweaver.card-source-lock.v1','catalog_commit':SOURCE_COMMIT,'catalog_path':CATALOG_PATH,'sigrun_commit':'2cc7acb589d94adf58f024abf8853ebfd1ebbe40','sigrun_blob':oracle_blob,'views_sha256':hashlib.sha256(args.views.read_bytes()).hexdigest(),'structured_private_runtime_fields':'EXCLUDED_BY_FIELD_SELECTION','free_text_privacy':'REQUIRES_PUBLICATION_REVIEW','history_complete':False})
    write_json(args.out/'index.json',{"version":catalog['version'],"source":catalog['source'],"coverage":catalog['coverage'],"cards":[{"id":c['id'],"name":c['name'],"kind":c['kind'],"summary":c['summary'],"definition_depth":c['definition_depth'],"detail":f"/cards/definitions/{c['id']}.json","text":f"/cards/definitions/{c['id']}.md"} for c in cards]})
    write_json(args.out/'hand.json',{"mission":"Public orientation; no execution authority","limit":8,"entries":[{"id":cid,"detail":f"/cards/definitions/{cid}.json"} for cid in hand]})
    write_json(args.out/'battlefield.json',{"status":"NO_VERIFIED_BINDINGS_IMPORTED","entries":[],"claim":"The public catalog has not imported applicable runtime verification evidence; this is not a census of all working HFO components."})
    for card in cards:
        write_json(args.out/'definitions'/f"{card['id']}.json",card)
        (args.out/'definitions'/f"{card['id']}.md").write_text(card_markdown(card),encoding='utf-8',newline='\n')
    prompt_rows=[{"id":c['id'],"name":c['name'],**c['art']} for c in cards]
    write_json(args.out/'image-prompts.json',{"version":"1.0.0","images_generated":0,"style":STYLE,"prompts":prompt_rows})
    manifest=[]
    for file in sorted(args.out.rglob('*')):
        if file.is_file() and file.name!='integrity.json':
            data=file.read_bytes();manifest.append({"path":file.relative_to(args.out).as_posix(),"bytes":len(data),"sha256":hashlib.sha256(data).hexdigest()})
    write_json(args.out/'integrity.json',{"algorithm":"SHA-256","source_commit":SOURCE_COMMIT,"files":manifest})
    print(json.dumps({"cards":len(cards),"full_definitions":catalog['coverage']['full'],"index_only":len(cards)-catalog['coverage']['full'],"battlefield_entries":0,"images_generated":0}))


if __name__=='__main__': main()
