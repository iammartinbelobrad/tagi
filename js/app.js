
var React = require('react');
var ReactDOM = require('react-dom');

var Tagr = React.createClass({
    getInitialState: function() {
        return {
            campaing: null,
            link: null,
            source: null,
            medium: null,
            longLink: null,
            shortLink: null,
            shortener: true
        };
    },
    handleSourceButtonClick: function(sourceData, e) {
        this.setState({
            source: sourceData.source,
            medium: sourceData.medium
        }, this.generate);
    },
    handleCampaignNameChange: function(e) {
        this.setState({
            campaing: e.target.value
        }, function() {
            this.setState({
                shortLink: null,
                longLink: null
            });
        });
    },
    handleLinkChange: function(e) {
        this.setState({
            link: e.target.value
        }, function() {
            this.setState({
                longLink: null,
                shortLink: null,
            });
        });
    },
    handleShortenerSwitch: function(e) {
        this.setState({
            shortener: e.target.checked
        }, function() {
            if(this.state.shortener === false) {
                this.setState({
                    shortLink: null,
                    longLink: null
                });
            }
        });

    },
    setShortUrl: function(response) {
        this.setState({
            shortLink: response.id
        });
    },
    generate: function() {
        // generate normal link
        var longLink = this.state.link + '?utm_source=' + this.state.source + '&utm_medium=' + this.state.medium + '&utm_campaing=' + encodeURIComponent(this.state.campaing);
        this.setState({
            'longLink': longLink
        });

        if(this.state.shortener === true) {
            // generate short link
            var parent = this;

            require('google-client-api')().then(function (gapi) {
                gapi.client.setApiKey('AIzaSyDNOFzGzxS53wGp9pndTt3iQNGUcV62wVQ');
                gapi.client.load('urlshortener', 'v1').then(function () {
                    var request = gapi.client.urlshortener.url.insert({
                        resource: {
                            longUrl: longLink
                        }
                    });
                    request.execute(parent.setShortUrl, function (reason) {
                        console.log('Error: ' + reason.result.error.message);
                    });
                });
            });
        }

    },
    render: function() {
        return (
            <div>
                <CampaignNameField onChange={this.handleCampaignNameChange} placeholder="Campaign name" />
                <LinkField onChange={this.handleLinkChange} placeholder="Paste link here" />
                <ShortenerSwitch onClick={this.handleShortenerSwitch} />
                <SourceButton onClick={this.handleSourceButtonClick} label="Facebook" source="facebook" medium="social" />
                <SourceButton onClick={this.handleSourceButtonClick} label="Facebook Ads" source="facebook" medium="cpc" />
                <SourceButton onClick={this.handleSourceButtonClick} label="Twitter" source="twitter" medium="social" />
                <SourceButton onClick={this.handleSourceButtonClick} label="Google+" source="google" medium="social" />
                <SourceButton onClick={this.handleSourceButtonClick} label="Google AdWords" source="google" medium="cpc" />
                <SourceButton onClick={this.handleSourceButtonClick} label="Bing" source="bing" medium="cpc" />
                <SourceButton onClick={this.handleSourceButtonClick} label="Sklik" source="sklik" medium="cpc" />
                <SourceButton onClick={this.handleSourceButtonClick} label="E-mail or direct" source="email" medium="email" />
                <SourceButton onClick={this.handleSourceButtonClick} label="Newsletter" source="newsletter" medium="email" />
                <SourceButton onClick={this.handleSourceButtonClick} label="QR code" source="qrcode" medium="offline" />
                <OutputField placeholder="And copy from here" value={this.state.shortener === true ? this.state.shortLink : this.state.longLink} />
            </div>
        );
    }
});

var ShortenerSwitch = React.createClass({
    render: function() {
        return (
            <input type="checkbox" onClick={this.props.onClick} defaultChecked />
        );
    }
});

var LinkField = React.createClass({
   render: function() {
       return (
           <input type="text" onChange={this.props.onChange} placeholder={this.props.placeholder} />
       );
   }
});

var SourceButton = React.createClass({
    getInitialState: function() {
        return {
            source: this.props.source,
            medium: this.props.medium
        };
    },
    render: function() {
        return (
            <button onClick={this.props.onClick.bind(null, this.state)}>{this.props.label}</button>
        );
    }
});

var CampaignNameField = React.createClass({
    render: function() {
        return (
            <input type="text" onChange={this.props.onChange} placeholder={this.props.placeholder} />
        );
    }
});

var OutputField = React.createClass({
    handleClick: function(e) {
        e.target.select();
    },
    render: function() {
        return (
            <input type="text" placeholder={this.props.placeholder} value={this.props.value} onClick={this.handleClick} readOnly />
        )
    }
});

ReactDOM.render(
    <Tagr />,
    document.getElementById('tagr-app')
);