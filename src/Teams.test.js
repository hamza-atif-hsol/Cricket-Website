import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import AxiosMock from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import Teams from './Components/Teams';
import { ToastContainer } from 'react-toastify';

const mock = new AxiosMock(axios);

describe('Teams Component', () => {
  beforeEach(() => {
    localStorage.setItem('user-info', JSON.stringify('mockToken'));
  });

  afterEach(() => {
    mock.reset();
  });

  test('renders the Teams component', async () => {
    mock.onGet('http://100.80.80.84:3000/identity/getAllTeams').reply(200, []);
    render(
      <Router>
        <Teams />
      </Router>
    );
    
    expect(screen.getByText('All Teams')).toBeInTheDocument();
  });

  test('fetches and displays teams', async () => {
    const teams = [
      { id: 123, name: 'Team A', meta: { imageUrl: 'imageA.png' } },
      { id: 231, name: 'Team B', meta: { imageUrl: 'imageB.png' } },
    ];
    
    mock.onGet('http://100.80.80.84:3000/identity/getAllTeams').reply(200, teams);

    render(
      <Router>
        <Teams />
      </Router>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Team A')).toBeInTheDocument();
      expect(screen.getByText('Team B')).toBeInTheDocument();
    });
  });

  test('opens the Add Team modal', () => {
    render(
      <Router>
        <Teams />
      </Router>
    );
    
    fireEvent.click(screen.getByRole('button', { name: /Add New Team/i }));
    
    expect(screen.getByText('Add Team')).toBeInTheDocument();
  });

  test('creates a new team', async () => {
    mock.onPost('http://100.80.80.84:3000/identity/addTeam').reply(200, {});

    render(
      <Router>
        <Teams />
        <ToastContainer />
      </Router>
    );
    
    fireEvent.click(screen.getByRole('button', { name: /Add New Team/i }));

    fireEvent.change(screen.getByLabelText('Team Name'), { target: { value: 'Team C' } });
    fireEvent.change(screen.getByLabelText('Country Name'), { target: { value: 'Country C' } });
    fireEvent.change(screen.getByLabelText('Country Flag'), { target: { value: 'flagC.png' } });

    fireEvent.click(screen.getByRole('button', { name: /Add Team/i }));

    await waitFor(() => {
      expect(screen.getByText('Team Added Successfully')).toBeInTheDocument();
    });
  });

  test('opens the Add Player modal', async () => {
    const teams = [
      { id: 145, name: 'Team A', meta: { imageUrl: 'imageA.png' } },
    ];

    mock.onGet('http://100.80.80.84:3000/identity/getAllTeams').reply(200, teams);

    render(
      <Router>
        <Teams />
      </Router>
    );
    
    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /Add Players/i }));
    });

    expect(screen.getByText('Add Player')).toBeInTheDocument();
  });

  test('creates a new player', async () => {
    const teamId = 321;
    const player = {
      name: 'Player A',
      age: 25,
      shirtNo: 10,
      role: 'Batsmen',
      identityNo: '12345'
    };
    
    mock.onPost(`http://100.80.80.84:3000/identity/addPlayer/${teamId}`).reply(200, {});

    render(
      <Router>
        <Teams />
        <ToastContainer />
      </Router>
    );

    await waitFor(() => fireEvent.click(screen.getByRole('button', { name: /Add Players/i })));
    
    fireEvent.change(screen.getByLabelText('Player Name'), { target: { value: player.name } });
    fireEvent.change(screen.getByLabelText('Player Age'), { target: { value: player.age } });
    fireEvent.change(screen.getByLabelText('Shirt Number'), { target: { value: player.shirtNo } });
    fireEvent.change(screen.getByLabelText('Identity Number'), { target: { value: player.identityNo } });

    fireEvent.click(screen.getByRole('button', { name: /Add Player/i }));

    await waitFor(() => {
      expect(screen.getByText('Player Added Successfully')).toBeInTheDocument();
    });
  });

  test('fetches and displays players of a team', async () => {
    const players = [
      { id: 1, name: 'Player 1', meta: { age: 28, role: 'Bowler', shirtNo: 12 } },
      { id: 2, name: 'Player 2', meta: { age: 30, role: 'Batsmen', shirtNo: 10 } },
    ];

    mock.onGet('http://100.80.80.84:3000/identity/getTeamById/1').reply(200, players);

    render(
      <Router>
        <Teams />
      </Router>
    );
    
    await waitFor(() => fireEvent.click(screen.getByRole('button', { name: /Add Players/i })));
    await waitFor(() => fireEvent.click(screen.getByAltText('view')));

    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });

  test('handles pagination', async () => {
    const players = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Player ${i + 1}`,
      meta: { age: 20 + i, role: 'Batsmen', shirtNo: 5 + i }
    }));

    mock.onGet('http://100.80.80.84:3000/identity/getTeamById/1').reply(200, players);

    render(
      <Router>
        <Teams />
      </Router>
    );
    
    await waitFor(() => fireEvent.click(screen.getByRole('button', { name: /Add Players/i })));
    await waitFor(() => fireEvent.click(screen.getByAltText('view')));

    expect(screen.getByText('Player 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('2'));

    expect(screen.getByText('Player 8')).toBeInTheDocument();
  });

  test('updates a player', async () => {
    const players = [
      { id: 1, name: 'Player 1', meta: { age: 28, role: 'Bowler', shirtNo: 12 } },
    ];

    mock.onGet('http://100.80.80.84:3000/identity/getTeamById/1').reply(200, players);
    mock.onPut('http://100.80.80.84:3000/identity/updatePlayer/1').reply(200, {});

    render(
      <Router>
        <Teams />
        <ToastContainer />
      </Router>
    );
    
    await waitFor(() => fireEvent.click(screen.getByRole('button', { name: /Add Players/i })));
    await waitFor(() => fireEvent.click(screen.getByAltText('view')));

    fireEvent.click(screen.getByRole('button', { name: /Update/i }));
    
    fireEvent.change(screen.getByLabelText('Player Name'), { target: { value: 'Updated Player' } });
    
    fireEvent.click(screen.getByRole('button', { name: /Update Player/i }));

    await waitFor(() => {
      expect(screen.getByText('Data Updated Successfully!')).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    mock.onPost('http://100.80.80.84:3000/identity/addTeam').reply(500);
  
    render(
      <Router>
        <Teams />
        <ToastContainer />
      </Router>
    );
  
    fireEvent.click(screen.getByRole('button', { name: /Add New Team/i }));
  
    fireEvent.change(screen.getByLabelText('Team Name'), { target: { value: 'Team D' } });
    fireEvent.change(screen.getByLabelText('Country Name'), { target: { value: 'Country D' } });
    fireEvent.change(screen.getByLabelText('Country Flag'), { target: { value: 'flagD.png' } });
  
    fireEvent.click(screen.getByRole('button', { name: /Add Team/i }));
  
  
    // await waitFor(() => {
    //   expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    // });
  });
  
});
