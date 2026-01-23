import genVibeCodingAgent from "../agent/vibeCoding";

class Context {
  aiComParamsMap: Record<string, any> = {};

  setAiComParams(id: string, aiComParams: any) {
    this.aiComParamsMap[id] = aiComParams;
  }

  getAiComParams(id: string) {
    return this.aiComParamsMap[id];
  }

  agent: any = {
    vibeCoding: null,
  };

  createVibeCodingAgent({ register }) {
    if (!this.agent.vibeCoding) {
      const that = this;
      console.log("[@that]", that)
      const vibeCoding = genVibeCodingAgent({ context: that });
      this.agent.vibeCoding = vibeCoding;
      register(vibeCoding);
    }
  }

  plugins: any;
}

export default new Context();
