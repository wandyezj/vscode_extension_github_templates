'use strict';

interface Template {
    readonly name: string;
    readonly note: string;
}

export interface TemplateManifest {
    readonly templates: Template[];
}

interface TemplateMap {
    [id:string] : Template;
}

// Allows remapping of templates to id -> value
export class Templates {
    constructor(manifest: TemplateManifest) {

        this.choices = {};

        for(let template of manifest.templates) {
            this.choices[template.name] = template;
        }
    }

    public choices : TemplateMap;
}
