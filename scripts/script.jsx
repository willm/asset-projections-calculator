window.onload = function () {
    var getPropertyValue = require('./get-property-value');
    var createModelRepo = require('./model');
    var modelRepository = createModelRepo(localStorage);
    var model = modelRepository.get();

    function addProperty(e) {
        var property = {
            name: $('#property-name').val(),
            value: $('#property-value').val(),
            increase: $('#property-projected-increase').val()
        };
        model.properties.push(property);
        draw();
        e.preventDefault();
    }
    var Properties = React.createClass({
        render: function () {
            return <div className="narrow-table">
                <h2>Properties</h2>
                <table className="table table-condensed">
                    <thead>
                        <tr>
                            <th>Property Name</th>
                            <th>Property Value</th>
                            <th>Projected Increase</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.properties.map(function (property) {
                        return <tr>
                            <td>{property.name}</td>
                            <td>{property.value}</td>
                            <td>{property.increase} %</td>
                        </tr>;
                    })}
                    </tbody>
                </table>
                <form className="form-inline" action="#" id="add-property" onSubmit={addProperty}>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="property-name">Property Name</label>
                        <input className="form-control" type="text"
                            name="property-name" id="property-name"
                            placeholder="Property Name"
                        />
                    </div>
                    <div className="form-group">
                            <label className="sr-only" htmlFor="property-value">Value</label>
                            <input className="form-control" type="number"
                                name="property-value" id="property-value"
                                placeholder="Value"
                            />
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                                <label className="sr-only" htmlFor="property-projected-increase">Yearly increase (%)</label>
                                <input className="form-control" type="number"
                                    name="property-projected-increase"
                                    id="property-projected-increase"
                                    placeholder="Projected Increase"
                                />
                                <div className="input-group-addon">%</div>
                        </div>
                    </div>
                    <button className="btn btn-default" type="submit">
                        <span className="glyphicon glyphicon-plus">Add</span>
                    </button>
                </form>
            </div>;
        }
    });

    var Projections = React.createClass({
        render: function () {
            return <div>
                <h2>Projections</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>2015</th>
                            <th>2016</th>
                            <th>2017</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.properties.map(function (property) {
                            return <tr>
                                <td>{property.name}</td>
                                <td>{getPropertyValue(property, 1)}</td>
                                <td>{getPropertyValue(property, 2)}</td>
                                <td>{getPropertyValue(property, 3)}</td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>;
        }
    });

    var Container = React.createClass({
        render: function () {
            return <div id="main-container">
                <Projections properties={this.props.properties}/>
                <Properties properties={this.props.properties} />
            </div>
        }
    });
    function draw () {
        modelRepository.save(model);
        React.render(<Container properties={model.properties} />,
                document.getElementById("content"));
    }
    draw();
};
