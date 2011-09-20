describe "Light Modal box plugin", ->
  putOptionValuesIntoArray = ($options, getText) ->
    values = []
    if getText == true
      $options.each ->
        values.push $(this).text()
    else
      $options.each ->
        values.push $(this).val()
    values

  # Set up the fixture path
  jasmine.getFixtures().fixturesPath = "spec/fixtures/"

  beforeEach ->
    loadFixtures "modals.html"
    $("#modal_trigger_1").lightModal()
    $("#modal_trigger_2").lightModal()
  
  describe "Initialisation", ->
    it "should hide the modal", ->
      expect($("#modal_1")).toBeHidden()
      expect($("#modal_2")).toBeHidden()
    
    it "should add a 'modal' class to the modal box", ->
      expect($("#modal_1")).toHaveClass "modal"
      expect($("#modal_2")).toHaveClass "modal"

  describe "Showing", ->
    beforeEach ->
      $("#modal_trigger_1").lightModal 'show'

    afterEach ->
      $("#modal_trigger_1").lightModal 'hide'
      
    it "should show the modal", ->
      expect($("#modal_1")).toBeVisible()
      expect($("#modal_2")).toBeHidden()
    
    it "should have an overlay", ->
      expect($(".light-modal-overlay")).toBeVisible()
      expect($(".light-modal-overlay").size()).toEqual(1)

  describe "Hiding", ->
    beforeEach ->
      $("#modal_trigger_1").lightModal 'show'
      $("#modal_trigger_1").lightModal 'hide'

    it "should hide the modal", ->
      waits 500
      runs ->
        expect($("#modal_1")).toBeHidden()
    
    it "should hide the overlay", ->
      expect($(".light-modal-overlay").size()).toEqual(0)
it "shows the edit input field", ->

    it "should hide the modal and overlay when the overlay is clicked", ->
      $("#modal_trigger_1").lightModal 'show'
      $(".light-modal-overlay").click()
      waits 500
      runs ->
        expect($("#modal_1")).toBeHidden()
        expect($(".light-modal-overlay").size()).toEqual(0)
