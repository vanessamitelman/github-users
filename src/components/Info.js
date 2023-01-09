import React from 'react';
import { GlobalGithubContext } from '../context/context';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi';
import Repos from './Repos';

const UserInfo = () => {
  const { githubUser } = GlobalGithubContext();
  const { public_repos, public_gists, followers, following } = githubUser;
  const array = [
    {
      title: 'Repos',
      value: public_repos,
      className: 'pink',
      icon: <GoRepo className='icon' />
    },
    {
      title: 'Followers',
      value: followers,
      className: 'green',
      icon: <FiUsers className='icon' />
    },
    {
      title: 'Following',
      value: following,
      className: 'purple',
      icon: <FiUserPlus className='icon' />
    },
    {
      title: 'Gists',
      value: public_gists,
      className: 'yellow',
      icon: <GoGist className='icon' />
    }
  ];
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        {array.map((item, index) => (
          <Item {...item} key={index} />
        ))}
      </Wrapper>
    </section>
  );
};
const Item = ({ title, value, className, icon }) => {
  return (
    <article className='item'>
      <span className={className}>{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </article>
  );
};
const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default UserInfo;
