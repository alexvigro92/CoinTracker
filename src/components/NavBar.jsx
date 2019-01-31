import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const textColorSecondary={
  color:'#019CF6'
};

const navbarColor={
  background:'#EFEFEF'
};

const style = {
    float       : 'none',
    width       : '320px',
    marginLeft  : '10px',
    marginTop  : '20px',
    marginRight : 'auto'
  };

export class NavbarComponent extends React.Component{

  render(){

    return (
      <Paper zDepth={2}>
        <Toolbar style={navbarColor} >
          <ToolbarGroup style={style}>
            <a href="/" className="block">
              <h3 className="bold-font HelveticaNeue-font">Coin <span style={textColorSecondary}>Tracker</span></h3>
            </a>
          </ToolbarGroup>
          <ToolbarGroup>
         <FontIcon className="muidocs-icon-custom-sort" />
         <ToolbarSeparator />
         <FlatButton href="/" label="Tracking" />
         <FlatButton href="/balances" label="My balances" />
         <IconMenu
           iconButtonElement={
             <IconButton touch={true}>
               <NavigationExpandMoreIcon />
             </IconButton>
           }
         >
           <MenuItem checked={this.props.bitcoin} onClick={() => this.props.visibiliyCurrency(this.props.bitcoin,"btc")} primaryText="Bitcoin" />
           <MenuItem checked={this.props.bitcash} onClick={() => this.props.visibiliyCurrency(this.props.bitcash,"bth")} primaryText="Bitcash" />
           <MenuItem checked={this.props.ethereum} onClick={() => this.props.visibiliyCurrency(this.props.ethereum,"eth")} primaryText="Ethereum" />
           <MenuItem checked={this.props.ripple} onClick={() => this.props.visibiliyCurrency(this.props.ripple,"rip")} primaryText="Ripple" />
           <MenuItem checked={this.props.litecoin} onClick={() => this.props.visibiliyCurrency(this.props.litecoin,"lic")} primaryText="Litecoin" />
         </IconMenu>
       </ToolbarGroup>
        </Toolbar>
      </Paper>
    );
  }
  }
