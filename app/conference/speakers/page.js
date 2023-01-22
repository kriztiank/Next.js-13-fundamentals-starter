import styles from '../conference.module.css'
import Link from 'next/link'

// Static site generation by default
// Static data fetching with revalidation
async function fetchSpeakers() {
  const response = await fetch(
    'https://raw.githubusercontent.com/adhithiravi/Consuming-GraphqL-Apollo/master/api/data/speakers.json',
    { next: { revalidate: 20 } }
  )

  const data = await response.json()
  return data
}

export default async function Page() {
  const data = await fetchSpeakers()

  return (
    <div className={styles.parentContainer}>
      <div>Last Rendered: {new Date().toLocaleTimeString()}</div>
      <h1>Welcome to Globomantics Speakers</h1>
      {data.speakers.map(({ id, name, bio }) => (
        <div key={id} className={styles.infoContainer}>
          <Link
            className={styles.bgLinks}
            href={`/conference/speakers/${name}`}
          >
            <h3 className={styles.titleText}>{name}</h3>
          </Link>

          <h5 className={styles.descText}>{bio}</h5>
        </div>
      ))}
    </div>
  )
}
