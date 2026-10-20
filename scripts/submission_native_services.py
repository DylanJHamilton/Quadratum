"""Validate native services in Main. Never transform code during packaging."""
import re
EXCLUDED=set()
def apply(root):
    dispatch=(root/'snippets/form-dispatch.liquid').read_text(encoding='utf-8')
    assert 'assign endpoint_valid' not in dispatch,'Apply native forms to Main before packaging.'
    for name in ['frontend-form-logic.js','frontend-form-logic-form-sections.js','maps-locator.js']:
        source=(root/'assets'/name).read_text(encoding='utf-8')
        assert not re.search(r'challenges\.cloudflare|recaptcha/api|maps\.googleapis',source),name
    return []
