import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LIST_POLL_PAGE } from '../../../../routes/urls';
import { useHistory } from 'react-router-dom';
import { createPoll, getPoll, updatePoll } from '../../../../apis/poll';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './styles.module.scss'
import { showErrorMessage, showSuccessMessage } from '../../../../utils/toast';
import { convertDatetimeForInput, formatTimeToUTC } from '../../../../utils/time';
import ReactSelect from '../../../../components/select/ReactSelect';

const PollForm = ({ isEdit }) => {
  const history = useHistory();
  const { pollId } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [publishAt, setPublishAt] = useState("");
  const [expireAt, setExpireAt] = useState("");
  const [maxVote, setMaxVote] = useState("");
  const [collectEmail, setCollectEmail] = useState({ value: 1, label: "Yes" });
  const [showResult, setShowResult] = useState({ value: 1, label: "Yes" });
  const [choices, setChoices] = useState([]);

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
          if (pollDetails.publish_at) setPublishAt(convertDatetimeForInput(pollDetails.publish_at));
          if (pollDetails.expire_at) setExpireAt(convertDatetimeForInput(pollDetails.expire_at));
          if (pollDetails.max_vote) setMaxVote(pollDetails.max_vote);
          setCollectEmail(pollDetails.collect_email ? { value: 1, label: "Yes" } : { value: 0, label: "No" });
          setShowResult(pollDetails.show_result ? { value: 1, label: "Yes" } : { value: 0, label: "No" });
          if (pollDetails.choices) setChoices(pollDetails.choices);
          setLoading(false)
        })
        .catch(error => {
          showErrorMessage("Couldn't get the poll's data")
          setLoading(false)
        })
    }
    // eslint-disable-next-line
  }, [isEdit, pollId]);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = {
      "index": index,
      "text": value
    };
    setChoices(newChoices);
  };

  const addNewChoice = () => {
    setChoices([...choices, {}]);
  };

  const removeChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    setLoading(true)

    const data = {
      title,
      description,
      is_active: isActive,
      publish_at: publishAt ? formatTimeToUTC(publishAt) : null,
      expire_at: expireAt ? formatTimeToUTC(expireAt) : null,
      max_vote: maxVote || null,
      collect_email: collectEmail?.value,
      show_result: showResult?.value,
      choices
    };

    if (isEdit) {
      updatePoll(pollId, data)
        .then(res => {
          showSuccessMessage("Poll updated successfully.")
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          showErrorMessage("Couldn't save the changes, please try again later.")
        })
    } else {
      createPoll(data)
        .then(res => {
          showSuccessMessage("Poll created successfully.")
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          showErrorMessage("Couldn't save the changes, please try again later.")
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
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
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
                    type="datetime-local"
                  />
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Expire at</label>
                  <input
                    value={expireAt}
                    onChange={event => setExpireAt(event.target.value)}
                    type="datetime-local"
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Maximum Allowed Vote</label>
              <input
                value={maxVote}
                onChange={event => setMaxVote(event.target.value)}
                type="number"
                placeholder="Enter maximum number of allowed vote"
              />
            </div>
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Do you want to collect email?</label>
                  <ReactSelect
                    options={[{ value: 1, label: "Yes" }, { value: 0, label: "No" }]}
                    value={collectEmail}
                    onChange={(newValue) => setCollectEmail(newValue)}
                  />
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.formGroup}>
                  <label>Do you want show poll result after user's submission?</label>
                  <ReactSelect
                    options={[{ value: 1, label: "Yes" }, { value: 0, label: "No" }]}
                    value={showResult}
                    onChange={(newValue) => setShowResult(newValue)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Choices</label>
              {choices.map((choice, index) => (
                <div className={styles.choiceRow} key={index}>
                  <input
                    value={choice.text}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                    type="text"
                    placeholder={`Choice ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeChoice(index)}
                    className={styles.danger}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className={styles.buttonGroup}>
                <button type="button" onClick={addNewChoice} className={styles.secondary}>
                  + Add
                </button>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.primary} disabled={loading}>Save Changes</button>
              <button onClick={() => history.push(LIST_POLL_PAGE)} className={styles.secondary}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PollForm;
