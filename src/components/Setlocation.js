
import React from 'react';
import PlacesAutocomplete, {
geocodeByAddress,
suggestions,
getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
constructor(props) {
    super(props);
    this.state = { address: '' , latlng: ''};
}
    // const [add, setAdd] =
handleChange = address => {
    this.setState({ address:address });
};

handleSelect = address => {
    geocodeByAddress(address)
    .then(results => {
        console.log(results[0])
        this.setState({address:results[0].formatted_address})
        return getLatLng(results[0])})
    .then(latLng => this.setState({latlng : latLng}))
    .catch(error => console.error('Error', error));
};

render() {
    console.log(this.state.latlng, this.state.address)
    return (
        <>
        <div className="dashboard">
                <div className="container h-100">
                    <div className="row h-100 justify-content-start">
                        <div className="col-12">
                        </div>
                    </div>
                </div>
            </div>
    <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
    >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
            <input
            {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
            })}
            />
            <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
                const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                <div
                    {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                    })}
                >
                    <span>{suggestion.description}</span>
                </div>
                );
            })}
            </div>
        </div>
        )}
    </PlacesAutocomplete>
    </>
    );
}
}

export default LocationSearchInput;