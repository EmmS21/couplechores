import React from 'react';
import {render, screen} from '@testing-library/react';
import Home from '../page';

describe('Landing page email button', () => {
	it('renders the email login button', () => {
		render(<button>Email</button>);
		const textElement = screen.getByText(/Email/);
		expect(textElement).toBeInTheDocument();
	});
});

describe('Landing page Google button', () => {
	it('renders the Google login button', () => {
		render(<button>Google</button>);
		const textElement = screen.getByText(/Google/);
		expect(textElement).toBeInTheDocument();
	});
});

describe('Landing page phone # button', () => {
	it('renders the phone # login button', () => {
		render(<button>Phone #</button>);
		const textElement = screen.getByText(/Phone #/);
		expect(textElement).toBeInTheDocument();
	});
});
