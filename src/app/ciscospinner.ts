import { BUSY_CONFIG_DEFAULTS, IBusyConfig } from "angular2-busy";

const BUSY_OPTIONS_TEMPLATE = {
default: BUSY_CONFIG_DEFAULTS.template,
custom: `
<div style="background: url('assets/preloader.gif') no-repeat center 20px; background-size: 125px;margin-top:200px;">
<div style="margin-top: 110px; text-align: center; font-size: 18px; font-weight: 700;">
{{message1}}
</div>
</div>
`
}

export const getBusyConfig = () => {
const BUSY_CONFIG_CUSTOM = Object.assign({}, BUSY_CONFIG_DEFAULTS);
BUSY_CONFIG_CUSTOM.template = BUSY_OPTIONS_TEMPLATE['custom']
return BUSY_CONFIG_CUSTOM
}