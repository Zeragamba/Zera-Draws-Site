import z from 'zod'

import { EditableImage, EditablePost, noop, PostData, postToFormData } from '../../Lib'
import { postDataSchema } from '../Schemas/Post'
import { ServerClient } from '../ServerClient'

export class PostApiClient extends ServerClient {
  public static async createPost(
    post: EditablePost,
    images: EditableImage[],
    onUploadProgress: (progress: number) => void = noop,
  ): Promise<PostData> {
    const data = await this.post(
      '/posts',
      postToFormData({ post, images }),
      {
        onUploadProgress: (event) => {
          const progress = event.progress || 0
          onUploadProgress(progress * 100)
        },
      },
    )

    return z.object({ post: postDataSchema })
      .transform((data) => data.post)
      .parse(data)
  }
}
