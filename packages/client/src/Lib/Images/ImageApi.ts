class ImageApi {
  public async fetchImage(params: { src: string }): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const image = new Image()
      image.src = params.src
      image.onload = () => resolve(image)
    })
  }
}

export const imageApi = new ImageApi()
