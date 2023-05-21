import PromptCard from './PromptCard';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text blue_gradient text-left">
        {name} Profile
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-16 prompt_layout">
        {data.map(prompt => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleEdit={() => handleEdit(prompt)}
            handleDelete={() => handleDelete(prompt)}
          />
        ))}
      </div>
    </section>
  )
}

export default Profile