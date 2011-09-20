# LightModal is a a simple and lightweight lighbox/modal plugin. Made for use with 
# inline content.
#
# Usage
# ==================
# $('.your-button').lightModal({
#  modalContainer: '#some_container'
# })
(($) ->
  methods = 
    # Initialise the modal box
    init: (options) ->
      @each ->
        self = this
        $this = $(this)
        data = $this.data('lightModal')

        # use the href anchor as the id of the container
        if $this.attr('href')
          modalContainer = $this.attr('href')
        else
          modalContainer = '#some_container'


        @options = $.extend(
          modalContainer: modalContainer
          width: 'auto'
          padding: 36 # Padding
          overlayDisable: true # Hides the modal box when the overlay (background) is clicked
          overlayHtml: '<div class="light-modal-overlay"></div>',
          $this.data('lightModal') or {},
          options or {}
        )

        unless data
          #data is empty, this is a new instance
          # Initialise the virgin plugin elements here

          # Init the modal element
          @$modalContainer = $(@options.modalContainer)
          @$modalContainer.hide()
          @$modalContainer.addClass('modal')
          if @options.width != 'auto'
            @$modalContainer.width(@options.width)

          @modalWidth = @$modalContainer.width()

          @$overlay = $(@options.overlayHtml)

          #Bind a click listener to the element
          $this.click (e) ->
            e.preventDefault()
            $(this).lightModal('show')
    
    destroy: ->
      @each ->
        $this = $(this)
        data = $this.data('lightModal')
        $(window).unbind '.lightModal'
        data.lightModal.remove()
        $this.removeData 'lightModal'

    # Show the modal box
    show: ->
      @each ->
        $this = $(this)

        # Set up the dimentions and position on the page
        @$modalContainer.width @modalWidth - (@options.padding * 2)
        @$modalContainer.css 'left', ($(window).width() - @modalWidth)/2 + 'px'
        @$modalContainer.css 'top', $(window).scrollTop() + 'px'
        @$modalContainer.css 'padding', @options.padding + 'px'

        # Add an overlay to the page
        @$overlay.appendTo('body').click (e) =>
          e.preventDefault()
          if @options.overlayDisable
            # only allow hiding the modal when overlay is clicked if 'overLayDisable is true'
            $this.lightModal('hide')

        @$modalContainer.slideDown(200)
    
    # Hide/close the modal box
    hide: ->
      @each ->
        $this = $(this)
        @$modalContainer.slideUp(200)
        @$overlay.remove()
  
  $.fn.lightModal = (method) ->
    if methods[method]
      methods[method].apply this, Array::slice.call(arguments, 1)
    else if typeof method == 'object' or not method
      methods.init.apply this, arguments
    else
      $.error 'Method ' + method + ' does not exist on jQuery.lightModal'
) jQuery