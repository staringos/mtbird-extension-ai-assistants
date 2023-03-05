import { IExtensionContext } from "@mtbird/shared";
import AICopywriter from "./features/AICopywriter";
import AIIllustrator from "./features/AIIllustrator";

const activity = (context: IExtensionContext) => {
  context.registerFeature("AIIllustrator.tab", AIIllustrator);
  context.registerFeature("AICopywriter.tab", AICopywriter);
};

export default activity;
