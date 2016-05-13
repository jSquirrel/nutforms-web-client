import NutformsApiAspectsSource from './aspectsSource/NutformsApiAspectsSource.js';
import Nutforms from './Nutforms.js'
import * as NutformsActions from './actions/NutformsActions.js'
import * as ModelActions from './actions/ModelActions.js'
import * as AttributeActions from './actions/AttributeActions.js'

window.Nutforms = new Nutforms();
window.NutformsApiAspectsSource = NutformsApiAspectsSource;
window.NutformsActions = NutformsActions;
window.ModelActions = ModelActions;
window.AttributeActions = AttributeActions;
