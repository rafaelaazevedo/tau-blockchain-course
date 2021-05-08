App = {
  web3Provider: null,
  contracts: {},

  init: async function () {
    // Load locations.
    $.getJSON("../locations.json", function (data) {
      var locationsRow = $("#locationsRow");
      var locationTemplate = $("#locationTemplate");

      for (i = 0; i < data.length; i++) {
        locationTemplate.find(".panel-title").text(data[i].location);
        locationTemplate.find("img").attr("src", data[i].picture);
        locationTemplate.find(".country").text(data[i].country);
        locationTemplate.find(".currency").text(data[i].currency);
        locationTemplate.find(".flag").text(data[i].flag);
        locationTemplate.find(".btn-location").attr("data-id", data[i].id);

        locationsRow.append(locationTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    /*
     * Replace me...
     */

    return App.initContract();
  },

  initContract: function () {
    /*
     * Replace me...
     */

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-location", App.handleAdd);
  },

  markadded: function () {
    /*
     * Replace me...
     */
  },

  handleAdd: function (event) {
    event.preventDefault();

    var locationId = parseInt($(event.target).data("id"));

    /*
     * Replace me...
     */
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
