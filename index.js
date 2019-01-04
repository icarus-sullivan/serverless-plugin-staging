
const defaultVariable = {
  excludeFunctions: {

  },
  excludeResources: {

  },
};

class PluginStaging {
  constructor(sls, options) {
    this.sls = sls;
    this.opts = options;

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
    const stage = this.opts.stage || this.sls.service.provider.stage;
    const customVariable = this.sls.service.custom || {};
    const stagingVariable = customVariable.staging || {};
    return Object.assign({}, defaultVariable, stagingVariable, {
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
