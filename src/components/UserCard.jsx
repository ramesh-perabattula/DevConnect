import React from 'react'

const UserCard = ({user}) => {
    const{firstName ,lastName,age,gender,about,photoUrl,skills}=user;
  return (
    <div>
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {gender && age && <p>gender:{gender} age:{age}</p>}
    {about && <p>{about}</p>}
    {skills && <p>{skills}</p>}
    <div className="card-actions justify-center">
        <button className="btn btn-secondary">ignore</button>
      <button className="btn btn-primary">intrested</button>
    </div>
  </div>
</div>
</div>
  )
}

export default UserCard