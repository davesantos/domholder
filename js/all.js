// var userFeed = new Instafeed({
//   get: 'user',
//     userId: 279519447,
//     accessToken: '279519447.467ede5.e2b9d533574f420780511a216603c0c7',
//     template: '<a href="{{link}}"><img src="{{image}}" /></a>'
// });
// userFeed.run();

feed = new Instafeed({
   get: 'user',
        userId: 280408524,
        accessToken: '280408524.ab103e5.d088f92db19f4f5faf0a442c9f0d2ae9',
        sortby: 'random',
        resolution: 'standard_resolution',
        links: 'false',
        limit: '10',
        template: '<a href="{{link}}" target="_blank"><img draggable="false" data-src="{{image}}" src="" /></a>',
  mock: true,
  custom: {
    images: [],
    currentImage: 0,
    showImage: function () {
      var result, image;
      image = this.options.custom.images[this.options.custom.currentImage];
      result = this._makeTemplate(this.options.template, {
        model: image,
        id: image.id,
        link: image.link,
        image: image.images[this.options.resolution].url,
        caption: this._getObjectProperty(image, 'caption.text'),
        likes: image.likes.count,
        comments: image.comments.count,
        location: this._getObjectProperty(image, 'location.name')
      });
      $("#instafeed").html(result);
    }
  },
  success: function (data) {
    console.log('image loaded')
    this.options.custom.images = data.data;
    this.options.custom.showImage.call(this);

    $("img").unveil(200, function() {
      $(this).load(function() {
        this.style.opacity = 1;
      });
    });

  }
});
feed.run();


