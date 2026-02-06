abstract class Context {
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

  abstract genVibeCodingAgent: ({ context }: { context: Context }) => any;

  createVibeCodingAgent({ register }) {
    if (!this.agent.vibeCoding) {
      const that = this;
      const vibeCoding = this.genVibeCodingAgent({ context: that });
      this.agent.vibeCoding = vibeCoding;
      register(vibeCoding);
    }
  }

  plugins: any;

  abstract updateFile: (id: string, { fileName, content }: { fileName: string, content: string }) => void;
}

export default Context;
