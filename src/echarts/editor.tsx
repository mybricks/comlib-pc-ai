import aiEditors from "./ai/editor-ai";

export default {
  '@init': (params) => {
    const {style, data, id, input, output} = params;
    style.width = 480;
    style.height = 420;
  },
  '@resize': {
    options: ['width', 'height']
  },
  '@ai': aiEditors,
}
