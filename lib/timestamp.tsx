interface dateable {
  createdAt: Date;
  updatedAt: Date;
}

export const setCreated = (resource: dateable) => {
  resource.createdAt = new Date()
  setUpdated(resource)
}

export const setUpdated = (resource: dateable) => {
  resource.updatedAt = new Date()
}
