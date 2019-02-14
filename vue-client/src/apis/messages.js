import { gql, client } from '../apollo-client'

const CREATE = gql`
mutation newMessage ($userId: ID!, $msg: String!) {
  message: newMessage (userId: $userId, msg: $msg) {
    id
    msg
    from {
      nickname
    }
  }
}
`

const FIND_ALL = gql`
query {
  messages {
    id
    msg
    from {
      nickname
    }
  }
}
`

const SUBSCRIBE_TO_NEW = gql`
subscription subscribeToNewMessages {
  message: newMessages {
    id
    msg
    from {
      nickname
    }
  }
}
`

export default {
  async create (variables) {
    return client.mutate({
      mutation: CREATE,
      variables
    })
  },

  async findAll () {
    return client.query({
      query: FIND_ALL
    })
  },

  subscribeToNew (callback) {
    let subscription = client.subscribe({
      query: SUBSCRIBE_TO_NEW
    })

    subscription.subscribe({
      next: callback
    })
  }
}
