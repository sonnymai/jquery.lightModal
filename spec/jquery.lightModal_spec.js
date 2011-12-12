
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
      return $("#modal_trigger_2").lightModal({
        onShow: function() {
          return $('#modal2_status').text('showing');
        },
        onHide: function() {
          return $('#modal2_status').text('hidden');
        }
      });
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
        $("#modal_trigger_1").lightModal('show');
        return $('.modal').stop();
      });
      afterEach(function() {
        return $("#modal_trigger_1").lightModal('hide');
      });
      it("should show the modal", function() {
        expect($("#modal_1")).toBeVisible();
        return expect($("#modal_2")).toBeHidden();
      });
      it("should have an overlay", function() {
        expect($(".light-modal-overlay")).toBeVisible();
        return expect($(".light-modal-overlay").size()).toEqual(1);
      });
      return it("should execute the onShow function", function() {
        $("#modal_trigger_2").lightModal('show');
        expect($('#modal2_status').text()).toEqual('showing');
        return $("#modal_trigger_2").lightModal('hide');
      });
    });
    return describe("Hiding", function() {
      beforeEach(function() {
        $("#modal_trigger_1").lightModal('show');
        $("#modal_trigger_1").lightModal('hide');
        $("#modal_trigger_2").lightModal('show');
        $("#modal_trigger_2").lightModal('hide');
        return $('.modal').stop();
      });
      it("should hide the modal", function() {
        waits(500);
        return runs(function() {
          return expect($("#modal_1")).toBeHidden();
        });
      });
      it("should hide the overlay", function() {
        return expect($(".light-modal-overlay").size()).toEqual(0);
      });
      return it("should execute the onHide function", function() {
        return expect($('#modal2_status').text()).toEqual('hidden');
      });
    });
  });

  it("shows the edit input field", function() {
    return it("should hide the modal and overlay when the overlay is clicked", function() {
      $("#modal_trigger_1").lightModal('show');
      $(".light-modal-overlay").click();
      waits(500);
      return runs(function() {
        expect($("#modal_1")).toBeHidden();
        return expect($(".light-modal-overlay").size()).toEqual(0);
      });
    });
  });
