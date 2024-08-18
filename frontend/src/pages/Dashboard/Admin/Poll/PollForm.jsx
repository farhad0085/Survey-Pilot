import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LIST_POLL_PAGE } from '../../../../routes/urls';
import { useHistory } from 'react-router-dom';
import { createPoll, getPoll, updatePoll } from '../../../../apis/poll';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './styles.module.scss'

const PollForm = ({ isEdit }) => {
  const history = useHistory();
  const { pollId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [publishAt, setPublishAt] = useState("");
  const [expireAt, setExpireAt] = useState("");
  const [maxVote, setMaxVote] = useState(true);
  const [collectEmail, setCollectEmail] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setLoading(true)
      getPoll(pollId)
        .then(res => {
          const pollDetails = res.data;
          if (pollDetails.title) setTitle(pollDetails.title);
          if (pollDetails.description) setDescription(pollDetails.description);
          if (pollDetails.is_active) setIsActive(pollDetails.is_active);
          if (pollDetails.publish_at) setPublishAt(pollDetails.publish_at);
          if (pollDetails.expire_at) setExpireAt(pollDetails.expire_at);
          if (pollDetails.max_vote) setMaxVote(pollDetails.max_vote);
          if (pollDetails.collect_email) setCollectEmail(pollDetails.collect_email);
          setLoading(false)
        })
        .catch(error => {
          console.log("Couldn't get the poll's data", error)
          setLoading(false)
        })
    }
    // eslint-disable-next-line
  }, [isEdit, pollId]);


  const handleFormSubmit = event => {
    event.preventDefault();
    setLoading(true)

    const data = {
      title,
      description,
      is_active: isActive,
      publish_at: publishAt || null,
      expire_at: expireAt || null,
      max_vote: maxVote,
      collect_email: collectEmail,
    };

    if (isEdit) {
      updatePoll(pollId, data)
      .then(res => {
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
    } else {
      createPoll(data)
      .then(res => {
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              value={title}
              onChange={event => setTitle(event.target.value)}
              type="text"
              placeholder="Enter poll title"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Full Description</label>
            <ReactQuill
              style={{ height: "200px", marginBottom: "60px" }}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                  ['link'],
                  ['clean'],
                ],
              }}
              formats={[
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent', 'link',
              ]}
              theme="snow"
              value={description}
              onChange={setDescription}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.col}>
              <div className={styles.formGroup}>
                <label>Publish at</label>
                <input
                  value={publishAt}
                  onChange={event => setPublishAt(event.target.value)}
                  type="date"
                />
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.formGroup}>
                <label>Expire at</label>
                <input
                  value={expireAt}
                  onChange={event => setExpireAt(event.target.value)}
                  type="date"
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.primary} disabled={loading}>Submit</button>
            <button onClick={() => history.push(LIST_POLL_PAGE)} className={styles.secondary}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default PollForm;
