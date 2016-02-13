
var React = require('react');
var ReactDOM = require('react-dom');

var Tagr = React.createClass({
    getInitialState: function() {
        return {
            campaing: null,
            link: null,
            source: null,
            medium: null,
            output: null
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
        });
    },
    handleLinkChange: function(e) {
        this.setState({
            link: e.target.value
        });
    },
    generate: function() {
        // generate normal link
        var longLink = this.state.link + '?utm_source=' + this.state.source + '&utm_medium=' + this.state.medium + '&utm_campaing=' + encodeURIComponent(this.state.campaing);

        // generate short link
        //TODO: goo.gl API

        this.setState({
            output: longLink
        });
    },
    render: function() {
        return (
            <div>
                <CampaignNameField onChange={this.handleCampaignNameChange} placeholder="Campaign name" />
                <LinkField onChange={this.handleLinkChange} placeholder="Paste link here" />
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
                <OutputField placeholder="And copy from here" value={this.state.output} />
            </div>
        );
    }
});

var LinkField = React.createClass({
   render: function() {
       return (
           <input type="text" onChange={this.props.onChange} placeholder={this.props.placeholder} />
       )
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
    render: function() {
        return (
            <input type="text" placeholder={this.props.placeholder} value={this.props.value} readOnly />
        )
    }
});

ReactDOM.render(
    <Tagr />,
    document.getElementById('tagr-app')
);