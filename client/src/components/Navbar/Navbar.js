import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const navbar = (props) => {
	// <i className="fas fa-basketball-ball" /> NBAccuracy
	return (
		<div className="mb-4">
			<Navbar style={{ backgroundColor: 'black', color: 'white' }} expand="md">
				<div className="container">
					<NavbarToggler onClick={props.toggle} />
					<NavbarBrand href="/">
						<i className="fas fa-basketball-ball" /> NBAccuracy
					</NavbarBrand>
					<Collapse isOpen={props.openStatus} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/home">Home</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/stats">Stats</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</div>
			</Navbar>
		</div>
	);
};

export default navbar;
