(function() {
  describe("Light Modal box plugin", function() {
    var putOptionValuesIntoArray;
    putOptionValuesIntoArray = function($options, getText) {
      var values;
      values = [];
      if (getText === true) {
        $options.each(function() {
          return values.push($(this).text());
        });
      } else {
        $options.each(function() {
          return values.push($(this).val());
        });
      }
      return values;
    };
    jasmine.getFixtures().fixturesPath = "spec/fixtures/";
    beforeEach(function() {
      loadFixtures("modals.html");
      $("#modal_trigger_1").lightModal();
      return $("#modal_trigger_2").lightModal();
    });
    describe("Initialisation", function() {
      it("should hide the modal", function() {
        expect($("#modal_1")).toBeHidden();
        return expect($("#modal_2")).toBeHidden();
      });
      return it("should add a 'modal' class to the modal box", function() {
        expect($("#modal_1")).toHaveClass("modal");
        return expect($("#modal_2")).toHaveClass("modal");
      });
    });
    describe("Showing", function() {
      beforeEach(function() {
        return $("#modal_trigger_1").lightModal('show');
      });
      afterEach(function() {
        return $("#modal_trigger_1").lightModal('hide');
      });
      it("should show the modal", function() {
        expect($("#modal_1")).toBeVisible();
        return expect($("#modal_2")).toBeHidden();
      });
      return it("should have an overlay", function() {
        expect($(".light-modal-overlay")).toBeVisible();
        return expect($(".light-modal-overlay").size()).toEqual(1);
      });
    });
    return describe("Hiding", function() {
      beforeEach(function() {
        $("#modal_trigger_1").lightModal('show');
        return $("#modal_trigger_1").lightModal('hide');
      });
      it("should hide the modal", function() {
        return expect($("#modal_1")).toBeHidden();
      });
      it("should hide the overlay", function() {
        return expect($(".light-modal-overlay").size()).toEqual(0);
      });
      return it("should hide the modal and overlay when the overlay is clicked", function() {
        $("#modal_trigger_1").lightModal('show');
        $(".light-modal-overlay").click();
        expect($("#modal_1")).toBeHidden();
        return expect($(".light-modal-overlay").size()).toEqual(0);
      });
    });
  });
}).call(this);
