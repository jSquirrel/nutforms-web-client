import Attribute from './Attribute.js'

export default class AttributeBuilder {

    constructor() {
        this.name = null;
        this.type = null;
        this.primary = false;
        this.localization = null;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setPrimary(primary) {
        this.primary = primary;
        return this;
    }

    /**
     * @param {AttributeLocalization} localization
     */
    addLocalization(localization) {
        this.localization = localization;
    }

    build() {
        return new Attribute(
            this.name,
            this.type,
            this.primary,
            this.localization
        );
    }

}
