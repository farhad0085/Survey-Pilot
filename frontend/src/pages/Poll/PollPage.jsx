import React, { useEffect, useState } from 'react'
import BaseLayout from '../../layouts/BaseLayout'
import { useParams } from 'react-router-dom'
import styles from "./styles.module.scss";
import { getPoll, submitPoll } from '../../apis/poll';
import { showErrorMessage } from '../../utils/toast';
import Loader from '../../components/Loader';

const PollPage = () => {

  const { pollId } = useParams();
  const [poll, setPoll] = useState({})
  const [loading, setLoading] = useState(false)
  const [hasVoted, setHasVoted] = useState(false);

  const handleChoiceClick = (choiceId) => {
    setHasVoted(false);

    const data = {
      poll: pollId,
      choice: choiceId
    }
    submitPoll(pollId, data)
      .then(({ data }) => {
        setPoll(data)
        setHasVoted(true)
      })
      .catch((error) => {
        showErrorMessage("Couldn't submit your vote, please try again.")
      })
  };

  useEffect(() => {
    setLoading(true)
    getPoll(pollId)
      .then(({ data }) => {
        setPoll(data)
        setLoading(false)
      })
      .catch((error) => {
        showErrorMessage("Error fetching poll data")
        setLoading(false)
      });
  }, [pollId]);

  const totalVotes = poll.choices?.reduce((sum, choice) => sum + choice.vote_count, 0);

  return (
    <BaseLayout>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.pollPage}>
          <h1 className={styles.pollTitle}>{poll.title}</h1>
          <div
            className={styles.pollDescription}
            dangerouslySetInnerHTML={{ __html: poll.description }}
          />
          <ul className={styles.pollChoices}>
            {poll.choices?.map((choice) => (
              <li
                key={choice.id}
                className={styles.pollChoice}
                onClick={() => handleChoiceClick(choice.id)}
              >
                <div className={styles.choiceText}>
                  {choice.text}
                  {hasVoted && (
                    <span className={styles.voteCount}>{choice.vote_count}</span>
                  )}
                </div>
                {hasVoted && (
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progress}
                      style={{
                        width: totalVotes > 0 ? `${(choice.vote_count / totalVotes) * 100}%` : '0%',
                      }}
                    ></div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

    </BaseLayout>
  )

}


export default PollPage