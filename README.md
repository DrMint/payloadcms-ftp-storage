# PayloadCMS FTP Storage Adapter

FTP adapter for Payload CMS's [plugin-cloud-storage](https://www.npmjs.com/package/@payloadcms/plugin-cloud-storage) plugin

This adapter uses [basic-ftp](https://www.npmjs.com/package/basic-ftp) to handle the FTP operations.

## Usage

Let's say we have a `Videos` collection (which slug is "videos") and we want to store the uploads on a third-party remote storage using FTP.

At the top of your `payload.config.ts` file, add the following:

```ts
import { ftpAdapter } from "payloadcms-ftp-storage";
```

Then within the `buildConfig` add the following:

```ts
plugins: [
  cloudStorage({
    collections: {
      videos: {
          adapter: ftpAdapter({
            host: "ftp.domain.com",
            user: "ftpUser",
            password: "ftpUserPassword",
            secure: true,
            endpoint: "https://domain.com/videos",
        }),
        disableLocalStorage: true,
        disablePayloadAccessControl: true,
      },
    },
  }),
],
```

If we upload a video file name "my-video.mp4", the file will be uploaded at the home of "ftpUser" at "ftp.domain.com", in a subfolder named "videos" (because this is the slug of the collection) as a file with the same name as the original "my-video.mp4". In conclusion, the path of the transfered file will be `~/videos/my-video.mp4`, and its public address will be `https://domain.com/videos/my-video.mp4`

Beware: when deleting an entry, the file will also be deleted on the remote storage. Also, if a file "my-video.mp4" already exists, and we try to upload another file with the same name, the original file will be overwritten.
