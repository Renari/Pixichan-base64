## PixiChan

### Description
Pixichan allow you to render images from https://pixiv.net. It will render into  `base64` format. 
If you following this url : https://i.pximg.net/img-original/img/2018/05/25/01/35/43/68906096_p0.png
It will return to `403 : Forbidden` it means you forbidden access to this link directly. So, this repository will handle this problem. 

### Installation ###
```sh
npm install --save pixichan
```

### Example
Basic example : 
```sh
const PixiChan = require('pixichan');
PixiChan('https://i.pximg.net/img-original/img/2018/05/25/01/35/43/68906096_p0.png')
.then((response)=>{
  console.log(response)
})
```
You can check following this item for more examples.
1. Express.js - Render image directly
2. Express.js + Vue.js - Render image to HTML

### API Reference ###
```sh
const PixiChan = require('pixichan')
```
**Constructor**<br>
Initialize new Pixichan. 

```sh
PixiChan(url)
```

| Param | Type |
| ------ | ------ |
| url | `string` |

**Error**<br>

| Description | Reason |
| ------ | ------ |
| 'Invalid URL of Pixiv image. ' | You can't put basic url in constructor<br>Url must following this format `http/s?*.(jpg/png/)` |
Regex details : `/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/`

### Usage guide ###
1. **Using Express.js**
    If you want to see image directly without any implementation to HTML, you can following this example

    `routes.js`
    ```sh
    Router.get('/', ({res}) => {
      PixiChan(URL).then((response)=>{
        res.writeHead(200, {'content-type': 'image/png'})
        res.end(response, 'binary')
      })
    }) 
    ```

2. **Using Express.js + Vue.js**
   If you want to render image into HTML, you can following this example. *PS : Actually, this is not for Vue only. You can implemented this way to another Framework.*

    `routes.js`
    ```sh
    Router.get('/', ({res}) => {
      PixiChan(URL).then((response)=>{
        const Test = Buffer.from(response, 'binary').toString('base64');
        res.end(Test)
      })
    }) 
    ```
    `main.vue`
    ```sh
    <template>
      <div class="Image">
        <img :src="'data:image/jpeg;base64,'+imageBytes">
      </div>
    </template>
    
    <script>
    import axios from 'axios';
    export default {
      data() {
        return {
          imageBytes: '',
        };
      },
      created() {
        axios.get('http://localhost:3000/api').then((response) => {
            this.imageBytes = response.data;
        });
      },
    };
    </script>
    ```