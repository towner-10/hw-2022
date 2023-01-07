import cohere from "cohere-ai";
import path from "path";
import fs from "fs/promises";
import { env } from "../env/server.mjs";

(async () => {
    cohere.init(env.COHERE_API_KEY);
})();

export const generateSteps = async (text: string) => {
    const staticDirectory = path.join(process.cwd(), 'static');
    const stepsPrompt = await fs.readFile(path.join(staticDirectory, 'steps-prompt.txt'), 'utf8');

    const prompt = (stepsPrompt + `\nGenerate a list of parts and steps for the question.\nQuestion: ${text}\nList of Parts and Steps:\n`)
        .replace(/\r\n/g, '\n');

    return await cohere.generate({
        model: 'xlarge',
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.9,
        k: 0,
        p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ["--"],
        return_likelihoods: 'NONE'
    });
};

export const generateParagraph = async (question: string, part: string, step: string) => {
    const staticDirectory = path.join(process.cwd(), 'static');
    const paragraphsPrompt = await fs.readFile(path.join(staticDirectory, 'paragraphs-prompt.txt'), 'utf8');
    
    const prompt = (paragraphsPrompt + `\nWrite a paragraph about the following step relevant to the question below.\nQuestion: ${question}\n${part}\n${step}\nParagraph:\n`)
        .replace(/\r\n/g, '\n');

    console.log("Generating paragraph for " + question + " " + part + " " + step);

    const response = await cohere.generate({
        model: 'xlarge',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.9,
        k: 0,
        p: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop_sequences: ["---"],
        return_likelihoods: 'NONE'
    });

    return response;
}