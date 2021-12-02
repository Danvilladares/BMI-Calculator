import React from 'react';
import $ from 'jquery';
import { Spinner, Container, Card, CardGroup,DropdownButton, Dropdown} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

export default class BmiComponent extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            weight: 0,
            height: 0,
            bmi: 0,
            showSpinner: false
        }
    }

    setWeight(val) {
        this.setState({
            weight: val
        });
    }

    setHeight(val) {
        this.setState({
            height: val
        });
    }
    
    fetch(val) {
        console.log(val);
        var context = this;
        
        context.setState({
            showSpinner: true
        });

        $.ajax({
            url: 'http://localhost:3001/bmi',
            method: 'GET',
            data: {
                type: val,
                weight: context.state.weight,
                height: context.state.height
            },
            success: function(response) {
                console.log(response);
                context.setState({
                    bmi: response.bmi,
                    showSpinner: false
                });
            }
        });
    }
    
    render() {
        return (
        <Container>
            <div className="row justify-content-center">
                <Card className="col-md-8">
                    <CardHeader>Compute BMI</CardHeader>
                    <CardGroup>
                        <Container>
                            <input type='number' min='1' className="form-control" placeholder="Weight" onChange={e => this.setWeight(e.target.value)} />
                            <input type='number' min='1' className="form-control" placeholder="Height" onChange={e => this.setHeight(e.target.value)} />
                            <div className="form-text"><h2><b>BMI</b>:{this.state.bmi}</h2></div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                { this.state.showSpinner ? <Spinner animation="grow" variant="primary"/> : null }
                                <DropdownButton title="Unit"  onSelect={e => this.fetch(e)}>
                                        <Dropdown.Item eventKey='metric'>Metric (cm,kg)</Dropdown.Item>
                                        <Dropdown.Item eventKey='us'>US Unit (inches,pounds)</Dropdown.Item>
                                </DropdownButton>
                            </div>
                        </Container>
                    </CardGroup>
                </Card>
            </div>
        </Container>
            
        );
    }
}