export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#FFFFFF",
  },
  caretLeftContainer: {
    // position: 'relative',
    paddingTop: 52,
    paddingLeft: 12,
  },
  headerTextContainer: {
    position: 'absolute',
    top: 55,
    alignSelf: 'center',
  },
  headerText: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
  },
  profileAccountInfoContainer: {
    flexDirection: 'row',
    marginHorizontal: 21,
    marginTop: 28,
    // borderColor: 'blue',
    // borderStyle: "solid",
    // borderWidth: 2,
  },
  profilePic: {
    // position: 'absolute',
    position: 'relative',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.12,
  },
  profilePicText: {
    fill: "#000000",
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 19,
    x: "31",
    y: "36",
    textAnchor: "middle",
  },
  profileNameContainer: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  accountNameText: {
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
  },
  accountJoinedText: {
    color: '#4F7484',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
  editProfileButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 21,
    height: 28,
    border: 'solid',
    borderWidth: 1,
    borderColor: '#E4E9F4',
    borderRadius: 4,
  },
  editProfileButtonText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
  },
  userStatsContainer: {
    marginHorizontal: 43,
  },
  userStatsPair: {
    flexDirection: 'row',
    paddingBottom: 30,
  },
  userStatsText: {
    paddingLeft: 13,
    color: '#4F7484',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
};
