import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Navbar from '../Navbar/Navbar';

const links = [
    {
        path: '/',
        exact: true,
        component: {},
        name: 'Component1',
    },
    {
        path: '/login',
        exact: true,
        component: {},
        name: 'Component2',
    },
];

jest.mock('../../router/routes', () => links);


describe('Navbar', () => {
    const username = 'Fred';

    describe('Not logged in', () => {
        beforeEach(() => {
            render(
                <MemoryRouter>
                    <Navbar links={links} />
                </MemoryRouter>
            );
        });

        it('displays indicator that no user is logged in', () => {
            expect(screen.getByText('Logged in: false')).toBeInTheDocument();
        });

        it('displays page links', () => {
            const screenLinks = screen.queryAllByRole('link');

            expect(screenLinks).toHaveLength(links.length);
            expect(screenLinks[0]).toHaveTextContent('Component1');
            expect(screenLinks[1]).toHaveTextContent('Component2');
        });

        it('displays logout button', () => {
            expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
        });
    });

    describe('Logged in', () => {
        it('displays logged-in user`s name', () => {
            render(
                <MemoryRouter>
                    <Navbar loggedIn={username} links={links} />
                </MemoryRouter>
            );

            expect(screen.getByText('Logged in: ' + username)).toBeInTheDocument();
        });
    });
});
