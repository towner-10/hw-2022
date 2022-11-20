from diffusers import StableDiffusionPipeline
import torch
import os

class Model:
    def __init__(self, num_images, max_per_batch, model_id):
        self.num_images = num_images
        self.max_per_batch = max_per_batch
        self.model_id = model_id
        self.pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
        self.pipe = self.pipe.to("cuda")

    def batch_pipe_gen(self, start, prompt, directory):
        results = self.pipe([prompt + " in WKHW1 Beautiful Art Style"]
                            * self.max_per_batch, num_inference_steps=30)
        nsfw = results.nsfw_content_detected
        images = results.images

        counter = start

        for i in range(len(images)):
            if nsfw[i] == True:
                print(f'NSFW detected, skipping {counter}')
                counter += 1
                continue

            images[i].save(f"{directory}/output_{counter}.png")
            counter += 1

        return counter

    def batch_pipe(self, id, prompt, directory):
        # Create a directory for the guide based on the ID
        directory = os.path.join(os.environ["GUIDE_DIRECTORY"], f'{id}\\images')
        prompt = prompt

        if not os.path.exists(directory):
            os.makedirs(directory)

        # Create image batches
        for i in range(0, self.num_images, self.max_per_batch):
            start = self.batch_pipe_gen(i, prompt, directory)

            if start >= self.num_images:
                break

        print(f'Images saved for {id}')

        # Return list of images
        json = {}
        for i in range(self.num_images):
            if os.path.exists(f"{directory}/output_{i}.png"):
                json[i] = f'images/output_{i}.png'
        
        return json