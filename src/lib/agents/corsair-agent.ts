import { Agent, tool } from "@openai/agents";
import { OpenAIAgentsProvider } from "@corsair-dev/mcp";

import { corsair } from "~/corsair";

export function createCorsairAgent(tenantId: string) {
    const provider = new OpenAIAgentsProvider();
    const tenantCorsair = corsair.withTenant(tenantId);
    const tools = provider.build({ corsair: tenantCorsair, tool, tenantId });

    return new Agent({
        name: "second-brain-corsair-agent",
        model: "gpt-4.1",
        instructions:
            "You are a concise assistant inside SecondBrain. Use Corsair tools when you need to inspect or act on connected apps. Be direct, keep responses short unless the user asks for detail, and never mention internal tool names unless necessary.",
        tools,
    });
}
