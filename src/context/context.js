import React, { useState, useEffect, createContext, useContext } from 'react';
import mockUser from './mockData/mockUser';
import mockRepos from './mockData/mockRepos';
import mockFollowers from './mockData/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState(0);
  const [error, setError] = useState({ show: false, msg: '' });

  const searchGithubUser = async (user) => {
    toggleError();
    setLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { repos_url, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${repos_url}?per_page=100`),
        axios(`${followers_url}?per_page=100`)
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toggleError(true, 'there is no user with that username');
    }
    checkRequests();
    setLoading(false);
  };
  //check rate limit
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining }
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, you have exceeded your hourly rate limit');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleError = (show = false, msg = '') => {
    setError({ show, msg });
  };
  useEffect(checkRequests, []);
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        loading,
        searchGithubUser
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

const GlobalGithubContext = () => {
  return useContext(GithubContext);
};
export { GithubProvider, GlobalGithubContext };
