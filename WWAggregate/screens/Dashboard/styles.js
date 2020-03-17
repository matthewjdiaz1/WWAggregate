export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    position: "relative",
    paddingHorizontal: 20,
    backgroundColor: "#E5E5E5",
    // backgroundColor: "white",
    color: '#000000',
    fontWeight: '500',
  },
  header: {
    textAlign: 'center',
    paddingTop: 94,
    fontSize: 64,
    lineHeight: 76,
  },
  headerText: {
    paddingTop: 8,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#4F7484',
  },
  macroText: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    padding: 10,
    color: '#4F7484',
  },
  macroContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginVertical: 30,
    width: 273,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: '#bfd8e3',
  },
  mealsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#bfd8e3',
    // borderBottomColor: '#E4E9F4',
  },
  mealsHeader: {
    position: 'relative',
    fontWeight: '500',
    fontSize: 32,
    lineHeight: 38,
    color: '#000000',
  },
  mealsCals: {
    position: 'relative',
    alignSelf: 'flex-end',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 60,
  },
  footerButtonTouchable: {
    backgroundColor: "clear",
    padding: 20,
  },
};
