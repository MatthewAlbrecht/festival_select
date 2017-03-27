$(() => {
  let fContainer = $('#festivals-container')
  let aContainer = $('#artists-container')

  const getFestivalArtists = (fest) => $.ajax({
    method: 'GET',
    url: `http://localhost:3000/lineup/${fest}`,
    data: {
      test: 'this is test',
      test2: 'this is test2'
    }
  })


  let listen = () => {
    // console.log('hehehe');
    $('.fest-choices').click((e) => {
      let festChoice = getFestivalArtists($(e.target).attr('data-fest-id'))
      $.when(festChoice)
        .then((data) => {
          for (artist of data) {
            aContainer.append(`<span class="artist" data-artist-id="${artist.id}">${artist.name}</span>`)
          }
          fContainer.toggle()
          aContainer.toggle()

        })
    })
  }

  listen()
})
