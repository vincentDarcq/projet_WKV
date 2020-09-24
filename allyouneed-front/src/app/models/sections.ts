import { Section } from './section';

export class Sections {
    
    sections: Array<Section>

    constructor(){
        this.sections = new Array()
    }

    push(section: Section){
        this.sections.push(section)
    }
}