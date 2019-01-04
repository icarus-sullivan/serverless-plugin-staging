
const defaultVariable = {
  excludeFunctions: {

  },
  excludeResources: {

  },
};

class PluginStaging {
  constructor(sls, options) {
    this.sls = sls;
    this.options = options;

    this.commands = {
      deploy: {
        lifecycleEvents: [
          'resources',
          'functions',
        ],
      },
    };

    this.hooks = {
      'before:deploy:resources': this.beforeDeployResources.bind(this),
      'before:deploy:functions': this.beforeDeployFunctions.bind(this),
    };
  }

  options() {
    const stage = this.options.stage || this.sls.service.provider.stage;
    const customVariable = this.sls.service.custom || {};
    const stagedVariable = customVariable.staged || {};
    return Object.assign({}, defaultVariable, stagedVariable, {
      stage,
    });
  }

  beforeDeployResources() {
    const { stage, excludeResources } = this.options();
    const exclusions = excludeResources[stage];
    if (!exclusions) {
      return;
    }

    for (const exclusion of exclusions) {
      delete this.sls.service.resources.Resources[exclusion];
    }
  }

  beforeDeployFunctions() {
    const { stage, excludeFunctions } = this.options();
    const exclusions = excludeFunctions[stage];
    if (!exclusions) {
      return;
    }

    for (const exclusion of exclusions) {
      delete this.sls.service.functions[exclusion];
    }
  }
}

module.exports = PluginStaging;
