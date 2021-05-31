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
        locationTemplate.find(".btn-vote").attr("data-id", data[i].id);

        locationsRow.append(locationTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function () {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access");
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache (create our web3 object based on our local provider)
    else {
      App.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:7545"
      );
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function () {
    $.getJSON("Voting.json", function (data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var VotingArtifact = data;
      App.contracts.Voting = TruffleContract(VotingArtifact);

      // Set the provider for our contract
      App.contracts.Voting.setProvider(App.web3Provider);

      return App.markVoted();
    });

    return App.bindEvents();
  },

  bindEvents: function () {
    $(document).on("click", ".btn-vote", App.handleVote);
  },

  markVoted: function () {
    var votingInstance;

    App.contracts.Voting.deployed()
      .then(function (instance) {
        votingInstance = instance;

        return votingInstance.getLocations.call();
      })
      .then(function (locations) {
        for (i = 0; i < locations.length; i++) {
          if (locations[i] !== "0x0000000000000000000000000000000000000000") {
            $(".panel-location")
              .eq(i)
              .find("button")
              .text("Voted 🎉")
              .attr("disabled", true);
          }
        }
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

  handleVote: function (event) {
    event.preventDefault();

    var locationId = parseInt($(event.target).data("id"));

    var votingInstance;

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Voting.deployed()
        .then(function (instance) {
          votingInstance = instance;

          // Execute vote as a transaction by sending account
          return votingInstance.vote(locationId, { from: account });
        })
        .then(function (result) {
          return App.markVoted();
        })
        .catch(function (err) {
          console.log(err.message);
        });
    });
  },
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
