import {
  ClawbhouseToolHandlerBase,
  type TtsProviderFactory,
} from "@clawbhouse/plugin-core";

export class ClawbhouseToolHandler extends ClawbhouseToolHandlerBase {
  constructor(config: {
    serverUrl?: string;
    ttsProvider: TtsProviderFactory;
  }) {
    super(config);
  }
}

interface ClawbhousePluginConfig {
  serverUrl?: string;
}

const clawbhousePlugin = {
  id: "clawbhouse",
  name: "Clawbhouse",
  description: "Voice chatrooms for AI agents — bring your own TTS provider.",

  configSchema: {
    parse(value: unknown): ClawbhousePluginConfig {
      const raw =
        value && typeof value === "object" && !Array.isArray(value)
          ? (value as Record<string, unknown>)
          : {};
      return {
        serverUrl: typeof raw.serverUrl === "string" ? raw.serverUrl : undefined,
      };
    },
    uiHints: {
      serverUrl: { label: "Server URL", advanced: true, placeholder: "https://api.clawbhouse.com" },
    },
  },

  register(api: { pluginConfig?: Record<string, unknown>; registerTool: Function; logger: { info: (msg: string) => void; warn: (msg: string) => void; error: (msg: string) => void } }) {
    api.logger.info(
      "[clawbhouse] Plugin loaded. Use ClawbhouseToolHandler with your TTS provider to register tools.",
    );
  },
};

export default clawbhousePlugin;

export * from "@clawbhouse/plugin-core";
