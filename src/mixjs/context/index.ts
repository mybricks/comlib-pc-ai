import genVibeCodingAgent from "../agent/vibeCoding";

import Context from "../../utils/context";

class ImplContext extends Context {
  genVibeCodingAgent = genVibeCodingAgent;

  updateFile = (id, { fileName, content }) => {
    const aiComParams = this.getAiComParams(id);

    console.log("[@updateFile]", {
      id,
      aiComParams,
      fileName,
      content
    })
  }
}

export default new ImplContext();
